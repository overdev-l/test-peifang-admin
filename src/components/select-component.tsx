import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


export default function SelectComponent(
    {
        value,
        options,
        placeholder,
        className,
        onSelect
    }: {
        value: string
        className: string
        placeholder: string
        options: Array<{
            label: string,
            value: string
        }>
        onSelect: (val: string) => void
    }
) {
    const handler = (val: string) => {
        onSelect(val)
    }
    return (
        <div className={className}>
            <Select onValueChange={handler} defaultValue={value}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((item) => {
                            return (
                                <SelectItem value={item.value} key={item.value}>{item.label}</SelectItem>
                            )
                        })}

                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}