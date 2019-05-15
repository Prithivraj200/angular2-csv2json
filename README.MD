# angular2-csv2json

# Installation
npm i angular2-csv2json --save

# Usage

In your module.ts,

import { CSV2JSONModule } from 'angular2-csv2json';

Then import it into your @NgModule

@NgModule({<br />
  ..<br />
  imports: [<br />
    CSV2JSONModule <br />
  ],.. <br />
})

in your .html,
 
  <csv2json 
     [btnText]="'custom text in button'"
     [errorMsg]="'custom error msg'"
     (response)=onUpload($event)
  ></csv2json>

  Default btnText is 'Upload'.
  Default errorMsg is 'Invalid format. Please upload only csv files..';

in your .ts,  

  onUpload(event: {type: string, data: any}){ <br /> 
    if (type === 'success) {<br /> 
      console.log(event.data);<br /> 
    } else {<br /> 
      console.log(event.data); // error<br /> 
    }<br />
  }<br />

## License

MIT © [Prithivraj200](mailto:prethive200@gmail.com)
