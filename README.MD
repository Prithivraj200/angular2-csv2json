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
 
  <csv2json (jsonData)=showJSON($event)></csv2json>

in your .ts,  

  showJSON(e){ <br /> 
    console.log(e); <br />
  }

## License

MIT © [Prithivraj200](mailto:prethive200@gmail.com)
