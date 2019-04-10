import * as React from 'react';
import { createStyles, WithStyles, withStyles, LinearProgress } from '@material-ui/core';
import LayerFieldItem from './LayerFieldItem';
import HanhChinhAPI from '../../../services/map/api/hanhchinh.api';
import HanhChinh from '../../../services/map/models/HanhChinh';
import Field = require('esri/layers/support/Field');
const styles = createStyles({
  root: {}
});

type Props = {
  layerField: Field,
  value: any,
  onChange: (name: string, value: any) => void
}
  & WithStyles<typeof styles>;

type States = {
  layerField: Field,
  isLoading: boolean
};

class QuanHuyenInputItem extends React.PureComponent<Props, States>{
  private static hanhChinhs: HanhChinh[] | null = null; // lưu cached
  constructor(props: Props) {
    super(props);

    let layerField = Field.fromJSON(props.layerField.toJSON()) ;
    layerField.domain = {
      type: 'coded-value',
      codedValues: [] as __esri.CodedValueDomainCodedValues[]
    } as __esri.CodedValueDomain;

    this.state = {
      layerField, isLoading: false
    };
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });

      // nếu chưa có dữ liệu
      if (!QuanHuyenInputItem.hanhChinhs) {
        QuanHuyenInputItem.hanhChinhs = await new HanhChinhAPI().getAllOnLyHuyenTP();
      }

      let layerField =  Field.fromJSON(this.state.layerField.toJSON()) ;
      (layerField.domain as __esri.CodedValueDomain).codedValues = QuanHuyenInputItem.hanhChinhs.map(m => ({ code: m.MaHuyenTP, name: m.TenHuyenTP } as __esri.CodedValueDomainCodedValues));
      this.setState({ layerField, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false })
      throw error;
    }
  }
  render() {
    const { classes, value, onChange } = this.props;
    const { layerField, isLoading } = this.state;
    return <div className={classes.root}>
      {isLoading && <LinearProgress />}
      <LayerFieldItem
        layerField={layerField}
        value={value}
        onChange={onChange}
      />
    </div>
  }
}

export default withStyles(styles)(QuanHuyenInputItem);