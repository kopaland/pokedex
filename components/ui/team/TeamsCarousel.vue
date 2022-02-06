<script lang="tsx">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'

import TeamCard from '@/components/ui/team/TeamCard.vue'
import { ITeam } from '~/types'

export default defineComponent({
  name: 'UITeamsCarousel',
  props: {
    teams: {
      type: Array as PropType<ITeam[]>,
      default: () => {
        return []
      },
    },
  },
  setup(props) {
    let defaultTransform = 0

    function goNext() {
      defaultTransform = defaultTransform - 398
      const slider = document.getElementById('slider')
      if (slider && Math.abs(defaultTransform) >= slider.scrollWidth / 1.7)
        defaultTransform = 0
      if (slider)
        slider.style.transform = 'translateX(' + defaultTransform + 'px)'
    }
    function goPrev() {
      const slider = document.getElementById('slider')
      if (Math.abs(defaultTransform) === 0) defaultTransform = 0
      else defaultTransform = defaultTransform + 398
      if (slider)
        slider.style.transform = 'translateX(' + defaultTransform + 'px)'
    }

    return () => (
      <div class="teams-carousel">
        <div class="teams-carousel__container">
          <button
            id="prev"
            aria-label="slide backward"
            class="teams-carousel__btn-prev"
            onClick={goPrev}
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1L1 7L7 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div class="teams-carousel__wrapper">
            <div id="slider" class="teams-carousel__slider">
              {props.teams.map((team) => (
                <TeamCard team={team} />
              ))}
            </div>
          </div>
          <button
            id="next"
            aria-label="slide forward"
            class="teams-carousel__btn-next"
            onClick={goNext}
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7 7L1 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  },
})
</script>
<style lang="scss" scoped>
.teams-carousel {
  display: flex;
  padding: 6rem 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  @media (min-width: 640px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  &__container {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  &__wrapper {
    overflow-x: hidden;
    overflow-y: hidden;
    width: 100%;
    height: 100%;
  }
  &__slider {
    display: flex;
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform;
    transition-duration: 700ms;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    gap: 3.5rem;

    @media (min-width: 768px) {
      gap: 1.5rem;
    }
    @media (min-width: 1024px) {
      gap: 2rem;
    }
  }
  &__btn-prev,
  &__btn-next {
    position: absolute;
    z-index: 30;
    cursor: pointer;
    &:focus {
      background-color: #9ca3af;
      box-shadow: var(--tw-ring-inset) 0 0 0
        calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
      --ring-color: #9ca3af;
      --ring-offset-width: 2px;
      box-shadow: 0 0 0 var(--ring-offset-width) var(--ring-offset-color),
        var(--ring-shadow);
      outline: 0;
    }
    & > svg {
      color: #111827;
    }
  }
  &__btn-prev {
    left: 0;
    margin-left: 2.5rem;
  }
  &__btn-next {
    right: 0;
    margin-right: 2.5rem;
  }
}
</style>
