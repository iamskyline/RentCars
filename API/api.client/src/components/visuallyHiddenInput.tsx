import { styled } from "@mui/material";

interface VisuallyHiddenInputProps {
    isMultiple?: boolean
    onSelectPhoto: (file: FileList | null) => void
}

export default function VisuallyHiddenInput({ isMultiple, onSelectPhoto }: VisuallyHiddenInputProps) {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    return (
        <VisuallyHiddenInput type="file" multiple={isMultiple} onChange={(e) => onSelectPhoto(e.target.files)} />
    )
}
