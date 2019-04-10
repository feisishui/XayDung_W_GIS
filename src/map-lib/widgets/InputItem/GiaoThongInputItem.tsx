import * as React from 'react';
import { createStyles, WithStyles, withStyles, LinearProgress } from '@material-ui/core';
import GiaoThongAPI from '../../../services/map/api/giaothong.api';
import Field = require('esri/layers/support/Field');
import Select from 'react-select';
import { InputActionMeta } from 'react-select/lib/types';
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
  isLoading: boolean,
  datas: any[],
  value: any
};

class QuanHuyenInputItem extends React.PureComponent<Props, States>{
  private giaoThongAPI: GiaoThongAPI = new GiaoThongAPI();
  constructor(props: Props) {
    super(props);

    let layerField = Field.fromJSON(props.layerField.toJSON());
    layerField.domain = {
      type: 'coded-value',
      codedValues: [] as __esri.CodedValueDomainCodedValues[]
    } as __esri.CodedValueDomain;

    this.state = {
      layerField, isLoading: false, datas: [], value: ''
    };
  }
  private delayTimer: NodeJS.Timer|null = null;
  private onInputChange(newValue: string, action: InputActionMeta) {
    this.setState({ isLoading: true });
    this.delayTimer && clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(async () => {
      this.giaoThongAPI.search(newValue)
      .then(values => {
        let newDatas = values.map(m => ({ value: m.MaConDuong, label: m.TenConDuong }));
        this.setState({ datas: newDatas, isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
        throw error;
      })
    }, 2000); // delay 2s
  
  }

  private onChange(value: string) {
    this.setState({ value });
  }

  render() {
    const { classes, value, onChange } = this.props;
    const { layerField, isLoading } = this.state;
    return <div className={classes.root}>
      {isLoading && <LinearProgress />}
      <Select
        onChange={this.onChange.bind(this)}
        value={this.state.value}
        options={this.state.datas}
        onInputChange={this.onInputChange.bind(this)}
      />
      {/* <LayerFieldItem
        layerField={layerField}
        value={value}
        onChange={onChange}
      /> */}
    </div>
  }
}

export default withStyles(styles)(QuanHuyenInputItem);