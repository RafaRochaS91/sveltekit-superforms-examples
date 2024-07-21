<script lang="ts" generics="T extends Record<'items', {
  value: string;
  id: string;
}[]>">
  import { Field, Control, Label } from 'formsnap';
  import { Select } from 'bits-ui';
  import {
    type FormPathArrays,
    type SuperForm,
  } from 'sveltekit-superforms';

  type Option = {
    id: string;
    value: string;
  };

  export let options: Option[];

  export let form: SuperForm<T>;
  export let field: FormPathArrays<T, Option[]>;
  export let label: string;

  const { form: formData } = form;

  $: selectedOption = $formData.items.map((item) => ({
    value: item.id,
    label: item.value,
  }));

  const handleOnSelect = (selected: { value: string; label?: string }[] | undefined) => {
      if (selected) {
        const newItems = selected.map((s) => {
          if (s.value && s.label) {
            return {
              id: s.value,
              value: s.label,
            };
          }
          return undefined;
        }).filter(Boolean);
        // This is a hack since TS doesn't correctly infer filter(Boolean) to discard undefined values
        $formData.items = newItems as Option[];
      } else {
        $formData.items = [];
      }
    }
</script>

<Field {form} name={field}>
  <Control let:attrs>
    <Label>
      {label}
    </Label>
    <Select.Root multiple selected={selectedOption} onSelectedChange={handleOnSelect}>
      {#each options as option}
        <input name={attrs.name} hidden value={option.id} />
      {/each}
      <Select.Trigger
        {...attrs}
        class="inline-flex h-input w-[296px] items-center rounded-9px border border-border-input bg-background px-[11px] text-sm transition-colors placeholder:text-foreground-alt/50  focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
      >
        <Select.Value placeholder="Click me!" />
      </Select.Trigger>
      <Select.Content
        class="w-full rounded-xl border border-muted bg-background px-1 py-3 shadow-popover outline-none"
      >
        {#each options as option}
          <Select.Item
            class="lex h-10 w-full select-none items-center rounded-button py-3 pl-5 pr-1.5 text-sm outline-none transition-all duration-75 data-[highlighted]:bg-muted"
            value={option.id}
          >
            {option.value}
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </Control>
</Field>
