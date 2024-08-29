import { TextField, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ClearableTextField = ({ value, onChange, onClear, onCopy, ...props }) => {
    const handleClear = () => {
        onChange({ target: { value: '' } });
        if (onClear) onClear();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
            .then(() => {
                if (onCopy) onCopy();
            })
            .catch((error) => {
                console.error('Error copying text to clipboard:', error);
            });
    };

    return (
        <TextField
            value={value}
            onChange={onChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {value && (onCopy || onClear) && (
                            <>
                                {onCopy && (
                                    <IconButton onClick={handleCopy} edge="end">
                                        <ContentCopyIcon />
                                    </IconButton>
                                )}
                                {onClear && (
                                    <IconButton onClick={handleClear} edge="end" color="error">
                                        <ClearIcon />
                                    </IconButton>
                                )}
                            </>
                        )}
                    </InputAdornment>
                )
            }}
            {...props}
        />
    );
};

export default ClearableTextField;