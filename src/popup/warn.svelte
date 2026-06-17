<script lang="ts">
  export let warn: string
</script>

{#if warn}
  <div class="warn-card" role="status">
    <strong>提示</strong>
    <p>{warn}</p>
  </div>
{/if}

<style>
  .warn-card {
    margin-top: 10px;
    padding: 11px 12px;
    border: 1px solid rgb(180 83 9 / 0.32);
    border-radius: var(--iq-radius-sm);
    color: var(--iq-text);
    background: var(--iq-warning-soft);
    text-align: left;
  }

  .warn-card strong {
    display: block;
    color: var(--iq-warning);
    font-size: 12px;
    font-weight: 760;
    line-height: 1.3;
  }

  .warn-card p {
    margin: 4px 0 0;
    color: var(--iq-text-muted);
    font-size: 12px;
    line-height: 1.5;
  }
</style>
