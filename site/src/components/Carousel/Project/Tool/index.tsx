interface ToolProps {
    name: string
    percent: number
}

export const Tool: React.FC<ToolProps> = ({ name, percent }) => {
    return (<li><label className="name"></label><div className='bar'></div></li>)
}