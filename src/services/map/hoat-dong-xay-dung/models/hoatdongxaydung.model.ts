export interface LinhVucCongViec {
    LinhVuc: string;
    CongViec: string;
}
export interface LinhVucCongViecFull {
    LinhVuc: LinhVuc;
    CongViec: CongViec;
}

export interface CongViec{
    MaCongViec:string;TenCongViec:string;
}

export interface LinhVuc{
    MaLinhVuc:string;
    TenLinhVuc:string;
}

export const CongViecs:CongViec[]=[
    
]

export const values: LinhVucCongViec[] = [
    { LinhVuc: 'THAMDINH', CongViec: 'Thiết kế cơ sở' },
    { LinhVuc: 'THAMDINH', CongViec: 'Thiết kế kỹ thuật và dự toán xây dựng' },
    { LinhVuc: 'THAMDINH', CongViec: 'Báo cáo kinh tế kỹ thuật' },
    { LinhVuc: 'THAMDINH', CongViec: 'DD-GD' },
    { LinhVuc: 'THAMDINH', CongViec: 'DD-TM' },
    { LinhVuc: 'THAMDINH', CongViec: 'DD-YT' },
    { LinhVuc: 'THAMDINH', CongViec: 'Điều chỉnh' },
    { LinhVuc: 'THAMDINH', CongViec: 'Dự án' },
    { LinhVuc: 'THAMDINH', CongViec: 'Hướng dẫn' },
    { LinhVuc: 'THAMDINH', CongViec: 'Tôn giáo' },
    { LinhVuc: 'THAMDINH', CongViec: 'Vốn CBĐT' },
]