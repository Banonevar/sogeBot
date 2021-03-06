<template>
  <div />
</template>

<script lang="ts">
import { getSocket } from '@sogebot/ui-helpers/socket';
import { Component, Vue } from 'vue-property-decorator';

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

@Component({})
export default class AlertsRegistryOverlays extends Vue {
  enabled = false;

  socket = getSocket('/overlays/texttospeech', true);
  socketRV = getSocket('/integrations/responsivevoice', true);
  responsiveAPIKey: string | null = null;

  isTTSPlaying() {
    return typeof window.responsiveVoice !== 'undefined' && window.responsiveVoice.isPlaying();
  }

  speak(data: { text: string; rate: number; volume: number; pitch: number; voice: string; }) {
    if (!this.enabled) {
      console.error('ResponsiveVoice is not properly set, skipping');
      return;
    }
    if (this.isTTSPlaying()) {
      // wait and try later
      setTimeout(() => this.speak(data), 1000);
      return;
    }
    window.responsiveVoice.speak(data.text, data.voice, {
      rate: data.rate, pitch: data.pitch, volume: data.volume / 100,
    });
  }

  initResponsiveVoice() {
    if (typeof window.responsiveVoice === 'undefined') {
      setTimeout(() => this.initResponsiveVoice(), 200);
      return;
    }
    window.responsiveVoice.init();
    console.debug('= ResponsiveVoice init OK');
    this.enabled = true;
  }

  checkResponsiveVoiceAPIKey() {
    this.socketRV.emit('get.value', 'key', (err: string | null, value: string) => {
      if (this.responsiveAPIKey !== value) {
        // unload if values doesn't match
        this.$unloadScript('https://code.responsivevoice.org/responsivevoice.js?key=' + this.responsiveAPIKey)
          .catch(() => {
            return;
          }); // skip error
        if (value.trim().length > 0) {
          this.$loadScript('https://code.responsivevoice.org/responsivevoice.js?key=' + value)
            .then(() => {
              this.responsiveAPIKey = value;
              this.initResponsiveVoice();
              setTimeout(() => this.checkResponsiveVoiceAPIKey(), 1000);
            });
        } else {
          console.debug('TTS disabled, responsiveVoice key is not set');
          this.enabled = false;
          this.responsiveAPIKey = value;
          setTimeout(() => this.checkResponsiveVoiceAPIKey(), 1000);
        }
      }
      setTimeout(() => this.checkResponsiveVoiceAPIKey(), 1000);
    });
  }

  mounted() {
    console.debug('mounted');
    this.checkResponsiveVoiceAPIKey();
    this.socket.on('speak', (data: { text: string; rate: number; volume: number; pitch: number; voice: string; }) => {
      console.debug('Incoming speak', data);
      this.speak(data);
    });
  }
}
</script>