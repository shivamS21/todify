import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
export default function CustomizeTask() {
    // 2 buttons
    // edit task, comment
    return (
        <div className="flex flex-row gap-1">
            <ModeEditOutlineOutlinedIcon sx={{ fontSize: 20 }}/>
            <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 20 }}/>
        </div>
    )
}