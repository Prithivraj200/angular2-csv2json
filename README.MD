# angular2-csv2json

# Installation
`npm i angular2-csv2json --save`

# Usage

> In your module.ts,

```
import { CSV2JSONModule } from 'angular2-csv2json';
```

> Then import it into your @NgModule
```
@NgModule({
  ..
  imports: [
    CSV2JSONModule
  ],..
})
```

> in your .html,
 ```
  <csv2json 
     [btnText]="'custom text in button. '"
     [errorMsg]="'custom error msg'"
     (response)='onUpload($event)'
  ></csv2json>
  ```

 * Default btnText is 'Upload'.
 * Default errorMsg is 'Invalid format. Please upload only csv files..';

> in your .ts,  

  ```
  onUpload(event: {type: string, data: any}) {
    if (event.type === 'success') {
      console.log(event.data);
    } else { 
      console.log(event.data); // error
    }
  }
  ```

## License

MIT © [Prithivraj200](mailto:prethive200@gmail.com)
