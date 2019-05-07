import * as React from 'react';
import { Paper, CircularProgress } from '@material-ui/core';

type Props = {
  capNhatHinhAnh?: (form: HTMLFormElement) => Promise<boolean>,
  attachments: __esri.AttachmentInfo[],
  xoaHinhAnh?: (id: number) => Promise<boolean>
};

type States = {
  isLoadingThemHinhAnh: boolean;
};

export default class AttachmentComponent extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoadingThemHinhAnh: false
    }
  }
  render() {
    const { capNhatHinhAnh, attachments, xoaHinhAnh } = this.props;
    const { isLoadingThemHinhAnh } = this.state;
    return (
      <div>
        {capNhatHinhAnh &&
          <form encType="multipart/form-data" method="post"
            onChange={this.onChange.bind(this)}
          >
            <input hidden name="f" value="json" />
            {isLoadingThemHinhAnh && <CircularProgress size={5} />}
            <input type="file" name="attachment" />
          </form>
        }
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {attachments.map(m =>
            <div key={m.id} style={{ display: 'flex', flexDirection: 'row' }}>
              <a
                style={{ flexGrow: 1 }}
                title={m.name} target="_blank" key={m.id} href={m.url}>{m.name}</a>
              {xoaHinhAnh &&
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => xoaHinhAnh(m.id)}
                  className="esri-icon-trash"
                ></span>
              }
            </div>
          )}
        </div>
      </div>
    );
  }

  private onChange(e: React.FormEvent<HTMLFormElement>) {
    if (this.props.capNhatHinhAnh) {
      this.setState({ isLoadingThemHinhAnh: true });
      this.props.capNhatHinhAnh(e.currentTarget)
        .then(() => this.setState({ isLoadingThemHinhAnh: false }))
    }
  }
}