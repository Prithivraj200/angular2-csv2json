import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'csv2json',
  templateUrl: 'csv2json.component.html',
  styleUrls: ['./csv2json.component.css']
})
export class Csv2JsonComponent {
  @ViewChild('file') file: ElementRef;
  @Input() btnText: string;
  @Input() errorMsg: string;
  @Output() response: EventEmitter<any> = new EventEmitter<any>();
  allowedFormat: Array<string>;

  constructor() {
    this.btnText = 'Upload';
    this.errorMsg = 'Invalid format. Please upload only csv files..';
    this.allowedFormat = [
      'text/csv',
      'application/vnd.ms-excel'
    ];
  }

  async getFiles(e) {
    try {
      const file = e.target.files[0];
      if (!this.allowedFormat.includes(file.type)) {
        this.file.nativeElement.value = '';
        this.response.emit({type: 'error', data: this.errorMsg});
        return;
      }
      let formatted: any = await this.readerResultOptimized(file);
      let [headers, ...data] = this.formatCSVData(
        formatted.result.split(/\r?\n|\r/)
      );
      this.arrayToObject(data, headers);
    } catch (e) {
      this.file.nativeElement.value = '';
      this.response.emit({type: 'success', data: []});
    }
  }

  readerResultOptimized(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        let datas = reader.result;
        if (datas) {
          resolve({ result: datas });
        } else {
          reject('No data found');
        }
      };
      reader.readAsBinaryString(file);
    });
  }

  formatCSVData(data) {
    return data.map(text => {
      const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
      const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
      if (!re_valid.test(text)) return null;
      let a = [];
      text.replace(re_value, (m0, m1, m2, m3) => {
        if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
        else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
        else if (m3 !== undefined) a.push(m3);
        return '';
      });
      if (/,\s*$/.test(text)) a.push('');
      return a;
    });
  }

  async arrayToObject(data, headers) {
    let obj = [];
    data.map(d => {
      let o = {};
      for (let j = 0; j < headers.length; j++) {
        o[headers[j]] = d[j];
      }
      o = JSON.parse(JSON.stringify(o, (key, value) => (!value ? '' : value)));
      obj.push(o);
    });
    this.file.nativeElement.value = '';
    this.response.emit({type: 'success', data: obj});
  }
}
