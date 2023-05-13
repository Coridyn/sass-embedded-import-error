import * as _path from 'path';
import * as fs from 'fs';
import sassEmbedded from 'sass-embedded';
import sassDart from 'sass';

let sass = sassEmbedded;
if (process.argv[2] === 'dart'){
    sass = sassDart;
}

const entryFile = _path.resolve('./src/index.scss');
const result = sass.renderSync({
    file: entryFile,
    importer: function(url, prev){
        
        console.log('## DEBUG importer url=', url);
        
        const path = _path.resolve('./include', url);
        if (fs.existsSync(path)){
            return {
                contents: fs.readFileSync(path, 'utf8'),
            };
        }
        return null;
    },
});

console.log('OK');
