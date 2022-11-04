import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listfilter'
})
export class ListfilterPipe implements PipeTransform {

  transform(value: any, search: string): any {
    debugger
    //if value or search value is not there then the value wille be return as it is...
    if (!value || !search) {
      return value;
    } else {

      //if the value or search value is there then this filtering will fire 

      // in the bellow example the condition work like 

      //1.  first of all i convert all the character in to the lowercase and then find the search value in array like indexOf and in thyis indexOf i'll again convert the search fildes character into the lowercase 

      //2. if the value not found then it will retuen null mease -1

      return value.filter(
        value => value.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    }

  }

}