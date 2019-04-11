import * as React from 'react';
import { createStyles, WithStyles, withStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import QuanHuyenInputItem from '../../../map-lib/widgets/InputItem/QuanHuyenInputItem';
import PhuongXaInputItem from '../../../map-lib/widgets/InputItem/PhuongXaInputItem';
import { LoaiQuyHoach } from '../../../services/map/quy-hoach/models/ranhgioiquyhoach.model'
import Field = require('esri/layers/support/Field');
const styles = createStyles({
  root: {}
});

type Props = {
  quanHuyen: string,
  phuongXa: string,
  loaiQuyHoach: string,
  onChange:(name:string,value:string)=>void
}
  & WithStyles<typeof styles>;

type States = {

};


class Component extends React.PureComponent<Props, States>{
  private quanHuyenLayerField = new Field({ alias: 'Huyện, TP, Thị xã', name: 'quanHuyen' });
  private phuongXaLayerField = new Field({ alias: 'Phường, xã', name: 'phuongXa' });
  constructor(props: Props) {
    super(props);
    this.state = {
     
    };
  }
  render() {
    const { classes, quanHuyen, phuongXa, loaiQuyHoach } = this.props;
    return <div className={classes.root}>
      <div><QuanHuyenInputItem layerField={this.quanHuyenLayerField} onChange={this.handleChange} value={quanHuyen} /></div>
      <div><PhuongXaInputItem maHuyenTP={quanHuyen} layerField={this.phuongXaLayerField} onChange={this.handleChange} value={phuongXa} /></div>
      <div><FormControl fullWidth >
        <InputLabel htmlFor="loaiQuyHoach">Loại quy hoạch</InputLabel>
        <Select
          name="loaiQuyHoach"
          value={loaiQuyHoach}
          fullWidth={true}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            this.handleChange('loaiQuyHoach', event.target.value);
          }}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {
            LoaiQuyHoach.map(m => <MenuItem key={m.value} value={m.code} >{m.value}</MenuItem>)
          }
        </Select>
      </FormControl></div>
    </div>;
  }


  handleChange = (name: string, value: string) => {
    this.props.onChange(name,value); 
  }
}

export default withStyles(styles)(Component);