import * as React from 'react';
import { createStyles, WithStyles, withStyles, Grid, ExpansionPanel, ExpansionPanelSummary, Tooltip, Typography, ExpansionPanelDetails } from '@material-ui/core';

//Component
import DialogComponent from '../../material-ui/DialogComponent';
import DetailsComponent from './DetailsComponent';
import FormComponent from './FormComponent';
import ActionFormComponent from './ActionFormComponent';

//REDUX
import { connect } from 'react-redux';
import { AllModelReducer } from '../../../reducers';
import { actionSetHoSoDuyTu, addHoSoDuyTu } from '../../../services/map/action';
import { HoSoDuyTu } from '../../../services/map/QuanLyMangLuoi/model';
import Add from '@material-ui/icons/Add';
const styles = createStyles({
  root: {

  }
});

type States = {
  newHoSo?: HoSoDuyTu
}

type StateToProps = {
  hoSoDuyTus?: HoSoDuyTu[]
};

type DispatchToProps = {
  close: () => void,
  addHoSoDuyTu: (model: HoSoDuyTu) => Promise<HoSoDuyTu | null>
};

type Props = {

}
  & StateToProps
  & DispatchToProps
  & WithStyles<typeof styles>;

class HoSoDuyTuComponent extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = { newHoSo: {} };
  }

  render() {
    const { classes, hoSoDuyTus } = this.props;
    if (!hoSoDuyTus) return null;

    const { newHoSo } = this.state;

    const open = hoSoDuyTus != undefined;

    const title = `Hồ sơ duy tu bảo dưỡng (${hoSoDuyTus.length}) `;

    return <div className={classes.root}>
      <DialogComponent
        title={title}
        open={open}
        onClose={this.handleCloseDlg.bind(this)}
      >
        <Grid container>
          <Grid item md={6} xs={12}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<Add />}>
                <Typography color="inherit" >Thêm mới</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails >
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <FormComponent
                      onChange={this.onChange.bind(this)}
                      model={newHoSo || {}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ActionFormComponent
                      onSubmit={this.submitForm.bind(this)}
                      onClear={this.clearForm.bind(this)}
                    />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsComponent datas={hoSoDuyTus || []} />
          </Grid>

        </Grid>
      </DialogComponent>
    </div>
  }

  private clearForm() {
    this.setState({ newHoSo: {} });
  }

  private submitForm() {
    if (this.state.newHoSo)
      this.props.addHoSoDuyTu(this.state.newHoSo);
  }

  private handleCloseDlg() {
    this.props.close();
  }

  private onChange(name: string, value: any) {
    if (this.state.newHoSo) {
      this.setState(state => ({ newHoSo: { ...state.newHoSo, [name]: value } }));
    }
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  hoSoDuyTus: state.mapQLML.hoSoDuyTus,

});

export default connect(mapStateToProps, { close: actionSetHoSoDuyTu, addHoSoDuyTu })(withStyles(styles)(HoSoDuyTuComponent));