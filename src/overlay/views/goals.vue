<template>
  <div
    v-if="group"
    class="w-100 h-100"
  >
    <template v-for="(goal, index) of group.goals">
      <transition
        :key="index"
        :css="false"
        @before-enter="beforeEnter"
        @enter="doEnterAnimation"
        @leave="doLeaveAnimation"
      >
        <b-progress
          v-if="goal.display === 'simple' && (group.goals.length === 1 || show === index || group.display.type === 'multi')"
          :height="goal.customizationBar.height + 'px'"
          :max="Number(goal.goalAmount)"
          style="border-radius: 0;"
          class="w-100"
          :class="{ disabled: isDisabled(index), 'position-absolute': group.display.type !== 'multi' }"
          :style="{
            border: goal.customizationBar.borderPx + 'px solid ' + goal.customizationBar.borderColor,
            'background-color': goal.customizationBar.backgroundColor ,
            'font-family': getFontFamilyCSS(goal.customizationFont.family),
            'margin-top': index !== 0 && group.goals.length > 0 && group.display.type === 'multi' ? group.display.spaceBetweenGoalsInPx + 'px' : '0px',
          }"
        >
          <b-progress-bar
            :value="Number(goal.currentAmount)"
            :style="{
              'background-color': goal.customizationBar.color
            }"
          />
          <div
            class="row no-gutters"
            :style="{
              'position': 'absolute',
              'height': (goal.customizationBar.height - (goal.customizationBar.borderPx * 2)) + 'px',
              'line-height': (goal.customizationBar.height - (goal.customizationBar.borderPx * 2)) + 'px',
              'width': '100%',
              'color': goal.customizationFont.color,
              'font-weight': goal.customizationFont.weight,
              'font-size': goal.customizationFont.size + 'px',
              'text-shadow': [textStrokeGenerator(goal.customizationFont.borderPx, goal.customizationFont.borderColor), shadowGenerator(goal.customizationFont.shadow)].filter(Boolean).join(', ')
            }"
          >
            <div class="col-4 text-left text-nowrap pl-2 pr-2">
              {{ goal.name }}
            </div>
            <div class="col-4 text-nowrap text-center">
              <template v-if="goal.type === 'tips'">
                {{ Intl.NumberFormat($store.state.configuration.lang, { style: 'currency', currency: $store.state.configuration.currency }).format(goal.currentAmount) }}
              </template>
              <template v-else>
                {{ goal.currentAmount }}
              </template>
            </div>
            <div class="col-4 text-nowrap text-right pr-2">
              <template v-if="goal.type === 'tips'">
                {{ Intl.NumberFormat($store.state.configuration.lang, { style: 'currency', currency: $store.state.configuration.currency }).format(goal.goalAmount) }}
              </template>
              <template v-else>
                {{ goal.goalAmount }}
              </template>
            </div>
          </div>
        </b-progress>
        <div
          v-else-if="goal.display === 'full' && (group.goals.length === 1 || group.display.type === 'multi' || show === index)"
          :class="{ disabled: isDisabled(index), 'position-absolute': group.display.type !== 'multi' }"
          style="width: 100%"
          :style="{
            'padding-top': index !== 0 && group.goals.length > 0 && group.display.type === 'multi' ? group.display.spaceBetweenGoalsInPx + 'px' : '0px',
          }"
        >
          <div
            class="row no-gutters"
            :style="{
              'color': goal.customizationFont.color,
              'font-size': goal.customizationFont.size + 'px',
              'text-shadow': [textStrokeGenerator(goal.customizationFont.borderPx, goal.customizationFont.borderColor), shadowGenerator(goal.customizationFont.shadow)].filter(Boolean).join(', ')
            }"
          >
            <div class="col text-center text-truncate pl-2 pr-2">
              {{ goal.name }}
            </div>
          </div>
          <b-progress
            :height="goal.customizationBar.height + 'px'"
            :max="goal.goalAmount"
            style="border-radius: 0;"
            class="w-100"
            :class="{ disabled: isDisabled(index) }"
            :style="{
              border: goal.customizationBar.borderPx + 'px solid ' + goal.customizationBar.borderColor,
              'background-color': goal.customizationBar.backgroundColor,
              'font-family': getFontFamilyCSS(goal.customizationFont.family)
            }"
          >
            <b-progress-bar
              :value="Number(goal.currentAmount)"
              :style="{
                'background-color': goal.customizationBar.color
              }"
            />
            <div
              class="row no-gutters"
              :style="{
                'position': 'absolute',
                'height': (goal.customizationBar.height - (goal.customizationBar.borderPx * 2)) + 'px',
                'line-height': (goal.customizationBar.height - (goal.customizationBar.borderPx * 2)) + 'px',
                'width': '100%',
                'color': goal.customizationFont.color,
                'font-size': goal.customizationFont.size + 'px',
                'text-shadow': [textStrokeGenerator(goal.customizationFont.borderPx, goal.customizationFont.borderColor), shadowGenerator(goal.customizationFont.shadow)].filter(Boolean).join(', ')
              }"
            >
              <div class="col text-center">
                <template v-if="goal.type === 'tips'">
                  {{ Intl.NumberFormat($store.state.configuration.lang, { style: 'currency', currency: $store.state.configuration.currency }).format(goal.currentAmount) }}
                  ({{ Intl.NumberFormat($store.state.configuration.lang, { style: 'percent' }).format(goal.currentAmount / goal.goalAmount) }})
                </template>
                <template v-else>
                  {{ goal.currentAmount }} ({{ Intl.NumberFormat($store.state.configuration.lang, { style: 'percent' }).format(goal.currentAmount / goal.goalAmount) }})
                </template>
              </div>
            </div>
          </b-progress>
          <div
            class="row no-gutters"
            :style="{
              'width': '100%',
              'color': goal.customizationFont.color,
              'font-size': goal.customizationFont.size + 'px',
              'text-shadow': [textStrokeGenerator(goal.customizationFont.borderPx, goal.customizationFont.borderColor), shadowGenerator(goal.customizationFont.shadow)].filter(Boolean).join(', ')
            }"
          >
            <div class="col text-left pl-2">
              <template v-if="goal.type === 'tips'">
                {{ Intl.NumberFormat($store.state.configuration.lang, { style: 'currency', currency: $store.state.configuration.currency }).format(0) }}
              </template>
              <template v-else>
                0
              </template>
            </div>
            <div
              v-if="!goal.endAfterIgnore"
              class="col-auto text-truncate text-center text-uppercase pl-2 pr-2"
            >
              {{ dayjs().to(goal.endAfter) }}
            </div>
            <div class="col text-right pr-2">
              <template v-if="goal.type === 'tips'">
                {{ Intl.NumberFormat($store.state.configuration.lang, { style: 'currency', currency: $store.state.configuration.currency }).format(goal.goalAmount) }}
              </template>
              <template v-else>
                {{ goal.goalAmount }}
              </template>
            </div>
          </div>
        </div>
        <div
          v-else-if="goal.display === 'custom' && (group.goals.length === 1 || group.display.type === 'multi' || show === index)"
          :id="'wrap-' + goal.id"
          class="wrap"
          v-html="goal.customizationHtml"
        />
      </transition>
    </template>
  </div>
</template>

<script lang="ts">
import { getSocket } from '@sogebot/ui-helpers/socket';
import { ProgressPlugin } from 'bootstrap-vue/esm/components/progress';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import gsap from 'gsap';
import { find } from 'lodash-es';
import safeEval from 'safe-eval';
import { Component, Vue } from 'vue-property-decorator';

import { GoalGroupInterface, GoalInterface } from 'src/bot/database/entity/goal';
import { dayjs } from 'src/bot/helpers/dayjs';
import { shadowGenerator, textStrokeGenerator } from 'src/panel/helpers/text';

Vue.use(ProgressPlugin);

@Component({})
export default class GoalsOverlay extends Vue {
  textStrokeGenerator = textStrokeGenerator;
  shadowGenerator = shadowGenerator;
  dayjs = dayjs;

  show = -1;
  group: GoalGroupInterface | null = null;
  loadedFonts: string[] = [];
  socket = getSocket('/overlays/goals', true);
  lastSwapTime: number = Date.now();
  triggerUpdate: string[] = [];
  cssLoaded: string[] = [];
  current: { subscribers: number, followers: number } = { subscribers: 0, followers: 0 };
  interval: number[] = [];

  beforeDestroy() {
    for(const interval of this.interval) {
      clearInterval(interval);
    }
  }

  mounted() {
    this.refresh();
    this.interval.push(window.setInterval(() => this.refresh(), 5000));
    this.interval.push(window.setInterval(() => {
      if (this.group === null) {
        return;
      }

      if (this.show === -1) {
        return (this.lastSwapTime = Date.now());
      }

      if (this.group.display.type === 'fade') {
        if (this.lastSwapTime + Number(this.group.display.durationMs) < Date.now()) {
          this.lastSwapTime = Date.now() + Number(this.group.display.animationInMs) + Number(this.group.display.animationOutMs);
          if (typeof this.group.goals[this.show + 1] === 'undefined') {
            this.show = 0;
          } else {
            this.show = this.show + 1;
          }
        }
      }
    }, 100));
  }

  beforeEnter (el: HTMLElement) {
    el.style.opacity = '0';
  }

  doEnterAnimation (el: HTMLElement, done: () => void) {
    if (this.group === null) {
      return;
    }
    if (this.group.display.type === 'fade') {
      gsap.to(el, {
        duration:   (this.group.display.animationInMs || 1000) / 1000,
        opacity:    1,
        onComplete: () => {
          done();
        },
      });
    }
  }

  doLeaveAnimation (el: HTMLElement, done: () => void) {
    if (this.group === null) {
      return;
    }
    if (this.group.display.type === 'fade') {
      gsap.to(el, {
        duration:   (this.group.display.animationOutMs || 1000) / 1000,
        opacity:    0,
        onComplete: () => {
          done();
        },
      });
    }
  }

  isDisabled(idx: number) {
    if (this.group === null) {
      return false;
    }

    const goal = this.group.goals[idx];
    return new Date(goal.endAfter).getTime() <= new Date().getTime() && !goal.endAfterIgnore;
  }

  getFontFamilyCSS (family: string) {
    return `"${family}" !important`;
  }

  refresh () {
    const id = window.location.href.split('/')[window.location.href.split('/').length - 1];
    if (id) {
      this.socket.emit('goals::current', (err: string | null, current: { subscribers: number, followers: number }) => {
        if (err) {
          return console.error(err);
        }
        this.current = current;
      });
      this.socket.emit('generic::getOne', id, (err: string | null, cb: Required<GoalGroupInterface> | undefined) => {
        if (err) {
          return console.error(err);
        }
        this.group = cb || null;

        if (this.group) {
          if (this.group.goals.length > 0) {
            for (const goal of this.group.goals) {
              const _goal = find(this.group.goals, (o) => o.id === goal.id);
              if (typeof _goal !== 'undefined') {
                if (Number(_goal.currentAmount) !== Number(goal.currentAmount)) {
                  console.debug(_goal.currentAmount + ' => ' + goal.currentAmount);
                  this.triggerUpdate.push((goal as Required<GoalInterface>).id);
                }
              }
            }
          }

          // update currentAmount for current types
          for (const goal of this.group.goals) {
            if (goal.type === 'currentFollowers') {
              if (goal.currentAmount !== this.current.followers) {
                this.triggerUpdate.push((goal as Required<GoalInterface>).id);
              }
              goal.currentAmount = this.current.followers;
            }
            if (goal.type === 'currentSubscribers') {
              if (goal.currentAmount !== this.current.subscribers) {
                this.triggerUpdate.push((goal as Required<GoalInterface>).id);
              }
              goal.currentAmount = this.current.subscribers;
            }
          }

          // add css import
          for (const goal of this.group.goals) {
            if (!this.cssLoaded.includes((goal as Required<GoalInterface>).id)) {
              this.cssLoaded.push((goal as Required<GoalInterface>).id);
              const head = document.getElementsByTagName('head')[0];
              const style = document.createElement('style');
              style.type = 'text/css';
              if (!this.loadedFonts.includes(goal.customizationCss)) {
                this.loadedFonts.push(goal.customizationCss);
                const css = goal.customizationCss
                  .replace(/\#wrap/g, '#wrap-' + goal.id); // replace .wrap with only this goal wrap
                style.appendChild(document.createTextNode(css));
              }
              head.appendChild(style);
            }
          }

          // add fonts import
          const head = document.getElementsByTagName('head')[0];
          const style = document.createElement('style');
          style.type = 'text/css';

          for (const goal of this.group.goals) {
            if (!this.loadedFonts.includes(goal.customizationFont.family)) {
              this.loadedFonts.push(goal.customizationFont.family);
              const font = goal.customizationFont.family.replace(/ /g, '+');
              const css = '@import url(\'https://fonts.googleapis.com/css?family=' + font + '\');';
              style.appendChild(document.createTextNode(css));
            }
          }
          head.appendChild(style);

          // if custom html update all variables
          for (const goal of this.group.goals) {
            if (goal.display === 'custom') {
              goal.customizationHtml = goal.customizationHtml
                .replace(/\$name/g, goal.name)
                .replace(/\$type/g, goal.type)
                .replace(/\$goalAmount/g, String(goal.goalAmount))
                .replace(/\$currentAmount/g, String(goal.currentAmount))
                .replace(/\$percentageAmount/g, Number((100 / (goal.goalAmount ?? 0)) * (goal.currentAmount ?? 0)).toFixed())
                .replace(/\$endAfter/g, new Date(goal.endAfter).toISOString());
            }

            // trigger onUpdate on nextTick
            this.$nextTick(() => {
              if (this.triggerUpdate.includes((goal as Required<GoalInterface>).id)) {
                const idx = this.triggerUpdate.indexOf((goal as Required<GoalInterface>).id);
                this.triggerUpdate.splice(idx, 1);

                console.debug('onUpdate : ' + goal.id);
                const toEval = `(function evaluation () { ${goal.customizationJs}; onChange(${goal.currentAmount}) })()`;
                safeEval(toEval);
              }
            });
          }

          this.$nextTick(() => {
            if (this.show === -1) {
              this.show = 0;
            }
          });
        }
      });
    } else {
      console.error('Missing id param in url');
    }
  }
}
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  filter: grayscale(0.7);
}
</style>
