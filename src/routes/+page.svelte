<script lang="ts">
  import SuperDebug, { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  import { MultiSelect } from '$lib/components';

  import { dataSchema } from './schema';

  export let data;

  const form = superForm(data.form, {
    validators: zodClient(dataSchema),
    dataType: 'json',
  });

  const { enhance, form: formData } = form;
</script>

<SuperDebug data={$formData} />
<form use:enhance method="POST" class="p-6 flex items-center w-full gap-4">
  <MultiSelect {form} field="items" label="Select Option" options={data.options} />
  <button type="submit" class="rounded-md bg-neutral-400 p-2">Submit</button>
</form>