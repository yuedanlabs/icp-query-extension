<script lang="ts">
  import { Divider } from "stdf"

  export let warn: string
</script>

{#if warn}
  <Divider text="WARN" />
  <div class="leading-relaxed text-xs text-start text-red-400">
    {warn}
  </div>
{/if}
