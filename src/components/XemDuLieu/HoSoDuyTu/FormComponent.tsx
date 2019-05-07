import * as React from 'react';
import { createStyles, WithStyles, withStyles, Grid, Typography, TextField } from '@material-ui/core';
import DatePicker, { TimeType } from '../../material-ui/DatePicker';
import { HoSoDuyTu } from '../../../services/map/QuanLyMangLuoi/model';
const styles = createStyles({
  root: {}
});

type Props = {
  onChange: (name: string, value: any) => void,
  model: HoSoDuyTu
}
  & WithStyles<typeof styles>;

type States = {

};

class Component extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes, onChange, model } = this.props;
    return <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item md={6} xs={12}>
                  <DatePicker
                    inputProps={{ fullWidth: true, label: 'Từ ngày' }}
                    type={TimeType.Date}
                    onChange={(date) => onChange('TuNgay', date)}
                    value={model.TuNgay}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <DatePicker
                    inputProps={{ fullWidth: true, label: 'Đến ngày' }}
                    type={TimeType.Date}
                    onChange={(date) => onChange('DenNgay', date)}
                    value={model.DenNgay}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Chi phí"
                    type="number"
                    value={model.ChiPhi != undefined ? model.ChiPhi : ''}
                    onChange={e=>onChange('ChiPhi',e.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Số lần"
                    type="number"
                    value={model.SoLan != undefined ? model.SoLan : ''}
                    onChange={e=>onChange('SoLan',e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nội dung"
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            value={model.NoiDung != undefined ? model.NoiDung : ''}
            onChange={e=>onChange('NoiDung',e.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  }
}

export default withStyles(styles)(Component);