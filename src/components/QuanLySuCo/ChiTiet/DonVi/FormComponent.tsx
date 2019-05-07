import * as React from 'react';
import {
  createStyles, WithStyles, withStyles,
  FormControl, InputLabel, Select, MenuItem, TextField
} from '@material-ui/core';
import {Loai} from '../../../../services/map/SuCo/models/sucothongtin.model';
const styles = createStyles({
  root: {}
});

type Props = {
  Loai: string|null,
  NoiDungPhanHoi: string|null,
  GhiChu: string|null,
  onChange:(name:string,value:any)=>void
}
  & WithStyles<typeof styles>;

type States = {

};

class DonViComponent extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes,Loai, NoiDungPhanHoi,GhiChu } = this.props;
    return <div className={classes.root}>
      <LoaiComponent value={Loai} onChange={(value: any) => this.props.onChange('Loai',value)} />
      <TextField
        value={NoiDungPhanHoi || ''}
        label="Nội dung phản hồi"
        fullWidth
        multiline
        rows={10}
        onChange={(e)=>this.props.onChange('NoiDungPhanHoi',e.target.value)}
      />
      <TextField
        value={GhiChu || ''}
        label="Ghi chú"
        fullWidth
        multiline
        rows={10}
        onChange={(e)=>this.props.onChange('GhiChu',e.target.value)}
      />
    </div>
  }
}

const LoaiComponent = (props: any) => {
  return <FormControl fullWidth >
    <InputLabel>Loại</InputLabel>
    <Select
    placeholder="Áp dụng cho hành động Hoàn thành"
      value={props.value != undefined ? props.value : ''}
      fullWidth={true}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
        props.onChange(event.target.value);
      }}
    >
      <MenuItem value=""><em>None</em></MenuItem>
      {

        Object.entries(Loai).map(m => <MenuItem key={m[0]} value={m[0]} >{m[1]}</MenuItem>)
      }
    </Select>
  </FormControl>
}



export default withStyles(styles)(DonViComponent);