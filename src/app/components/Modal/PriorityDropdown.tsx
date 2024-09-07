export default function PriorityDropdown ({ priority, setPriority } : { priority: string; setPriority: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <div className="task-editor-priority">
            <select className="priority-select optional-field" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="" disabled hidden>Select Priority</option>
                <option value="Priority-1">Priority 1</option>
                <option value="Priority-2">Priority 2</option>
                <option value="Priority-3">Priority 3</option>
                <option value="Priority-4">Priority 4</option>
            </select>

        </div>
    )
}