import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

export default function CustomizeTask({ onOpen }:{ onOpen: () => void}) {
    return (
        <div className="flex flex-row gap-1">
            <ModeEditOutlineOutlinedIcon onClick={onOpen} sx={{ fontSize: 20 }}/>
            <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 20 }}/>
        </div>
    )
}