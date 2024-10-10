import { Description, Field, Input, Label } from '@headlessui/react'

export default function Example({ label, description }) {
  return (
    <div className="w-full">
      <Field>
        <Label className="font-bold">{label}</Label>
        <Description className="text-sm/6 text-black/50">{description}</Description>
        <Input
          className={`mt-3 text-lg block w-full rounded-lg border-none bg-white-500/5 py-2.5 px-3.5 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`}
        />
      </Field>
    </div>
  )
}
