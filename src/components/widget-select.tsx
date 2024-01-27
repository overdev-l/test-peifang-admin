import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
export default function widgetSelect(
    {
        className,
        onSelect,
        value
    }: {
        className: string
        onSelect: (val: number) => void
        value: string
    }
) {
    const options = Array.from({ length: 11 }, (_, index) => ({label: index, value: index}))
    return (
        <div className={className}>
            <Select onValueChange={val => onSelect(Number(val))} defaultValue={value}>
                <SelectTrigger>
                    <SelectValue placeholder="请选择资源权重" defaultValue={value} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((item) => {
                            return (
                                <SelectItem value={String(item.value)} key={item.value}>{item.label}</SelectItem>
                            )
                        })}

                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}