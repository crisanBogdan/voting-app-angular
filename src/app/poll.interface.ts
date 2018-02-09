export interface Poll {
  author: string,
  title: string,
  options: any[]
}



export function createPoll(author: string, title: string, optionNames: string[]): Poll {
  
  let options = [];

  for (let option of optionNames) {
    options.push({name: option, votes: 0});
  }
    
  return {
    author: author,
    title: title,
    options: options
  };
}