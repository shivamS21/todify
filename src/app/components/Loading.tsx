import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
            <CircularProgress color="secondary" />
        </div>
    );
}
