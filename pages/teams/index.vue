<script lang="tsx">
import { defineComponent, useAsync } from '@nuxtjs/composition-api'
import { useTeams } from '~/components/composables/api/useTeams'

import TeamsCarousel from '@/components/ui/team/TeamsCarousel.vue'

export default defineComponent({
  name: 'TeamsView',
  setup() {
    const teams = useAsync(async () => {
      return await useTeams().getTeams()
    })

    return () => (
      <div>
        <div>
          <TeamsCarousel teams={teams.value || []} />
        </div>
        <div>
          <nuxt-child teams={teams.value || []} />
        </div>
      </div>
    )
  },
})
</script>
