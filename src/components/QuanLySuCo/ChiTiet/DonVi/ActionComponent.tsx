import * as React from 'react';
import {
  Button,
  createStyles, WithStyles, withStyles, Tooltip
} from '@material-ui/core';

const styles = createStyles({
  root: {
    '& .fa': {
      marginRight: 10
    },
    '& .fas': {
      marginRight: 10
    }
  },
  button: {
    margin: '0 7px'
  }
});

const SearchingAction = (props: {
  onSubmit: (e: React.MouseEvent) => void,
  onClear: (e: React.MouseEvent) => void,
  onPin:(e:React.MouseEvent)=>void,
  disabledSubmit?:boolean,
  disabledPin?:boolean
} & WithStyles<typeof styles>) => (
    <div className={props.classes.root}>
      <Tooltip title="Chuyển sang trạng thái đang xử lý đồng thời gửi thông tin phản hồi cho bộ phận quản lý">
        <Button
        className={props.classes.button}
          variant="contained"
          color="secondary"
          onClick={props.onPin}
          disabled={props.disabledPin != undefined?props.disabledPin:false}
        >
          <i className="fas fa-thumbtack" />
          Gửi
      </Button>
      </Tooltip>
      <Tooltip title="Xác nhận hoàn thành và gửi thông tin cho đơn vị vận hành">
        <Button
        className={props.classes.button}
          variant="contained"
          color="primary"
          onClick={props.onSubmit}
          disabled={props.disabledSubmit != undefined?props.disabledSubmit:false}
        >
          <i className="fas fa-check" />
          Hoàn thành
      </Button>
      </Tooltip>
      <Button
      className={props.classes.button}
        variant="text"
        onClick={props.onClear}
      >
        <i className="fas fa-eraser" />
        Xóa trắng
      </Button>
    </div>
  );

export default withStyles(styles)(SearchingAction);