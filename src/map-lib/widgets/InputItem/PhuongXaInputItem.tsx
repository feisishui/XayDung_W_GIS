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
  onChange: (name: string, value: any) => void,
  maHuyenTP: string | undefined
}
  & WithStyles<typeof styles>;

type States = {
  layerField: Field,
  isLoading: boolean
};

class PhuongXaInputItemComponent extends React.PureComponent<Props, States>{
  private static hanhChinhs: Array<HanhChinh[]> = []; // lưu cached
  constructor(props: Props) {
    super(props);

    let layerField = Field.fromJSON(props.layerField.toJSON());
    layerField.domain = {
      type: 'coded-value',
      codedValues: [] as __esri.CodedValueDomainCodedValues[]
    } as __esri.CodedValueDomain;

    this.state = {
      layerField, isLoading: false
    };
  }

  async componentWillReceiveProps(nextProps: Props) {
    // nếu giá trị huyện tp thay đổi
    if (this.props.maHuyenTP != nextProps.maHuyenTP) {
      const maHuyenTP = nextProps.maHuyenTP;
      this.loadData(maHuyenTP);
    }
  }

  async componentDidMount() {
    this.loadData(this.props.maHuyenTP)
  }

  private async loadData(maHuyenTP: string | undefined) {
    try {
      this.setState({ isLoading: true });
      let layerField = Field.fromJSON(this.state.layerField.toJSON());
      let domain = layerField.domain as __esri.CodedValueDomain;

      // nếu maHUyenTP có giá trị
      if (maHuyenTP) {
        let phuongXas: HanhChinh[] = [];
        let cached = PhuongXaInputItemComponent.hanhChinhs[maHuyenTP]; // lấy giá trị lưu cache
        // nếu chưa có thì request rồi lưu
        if (!cached) {
          let response = await new HanhChinhAPI().getAllByMaHuyenTP(maHuyenTP);
          phuongXas
            = PhuongXaInputItemComponent.hanhChinhs[maHuyenTP]
            = response ? response : [];
        } else { phuongXas = cached; }
        domain.codedValues =
          phuongXas.map(m => ({ code: m.MaPhuongXa, name: m.TenPhuongXa } as __esri.CodedValueDomainCodedValues))
      }
      // nếu maHuyenTP k có giá trị thì reset
      else {
        domain.codedValues = [];
      }
      this.setState({ layerField, isLoading: false });
    }
    catch (error) {
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

export default withStyles(styles)(PhuongXaInputItemComponent);