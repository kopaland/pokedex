<script lang="tsx">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UISkeletonLoader',
  setup() {
    return () => (
      <div class="skeleton-loader">
        <div>
          <div />
        </div>
      </div>
    )
  },
})
</script>
<style lang="scss" scoped>
.skeleton-loader {
  background-color: #ffffff;
  max-width: 24rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  & > div {
    display: flex;
    margin: 1.25rem;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    & > div {
      padding: 8rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      margin-top: 0.75rem;
      margin-top: 0.875rem;
      background-color: #d1d5db;
      border-radius: 0.375rem;
    }
  }
}
</style>
