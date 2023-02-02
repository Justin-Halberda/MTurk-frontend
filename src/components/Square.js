import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../styles/Square.css';
import { setColor } from '../utils/slices/colorSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function Square(props) {
    const { style, payload } = props;

    const [ open, setOpen ] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        
        dispatch(setColor(payload));
        navigate("/orientation");
      };

    const handleClick = ({ left, top, background }) => {
        payload.correct = payload.changing_before === background || payload.changing_after === background;
        payload.selected = background;
        payload.selected_x = left.replace("%", "");
        payload.selected_y = top.replace("%", "");

        setOpen(true);
    }

    return (
        <>
            <div className="square" style={style} onClick={() => handleClick(style)}/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={payload.correct ? "success" : "error"} sx={{ width: '100%' }}>
                    { payload.correct ? "Right Choice! " : "Wrong Choice! " } Close to continue
                </Alert>
            </Snackbar>
        </>
        
        
    )
}