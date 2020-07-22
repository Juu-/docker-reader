import {exec, OutputMode} from 'https://deno.land/x/exec/mod.ts';
import {Application, Context} from 'https://deno.land/x/abc@v1/mod.ts';
import Container from './models/Container.ts';
import Image from './models/Image.ts';

const port = 1337;

const app = new Application();
app
.file("/", 'frontend/index.html')
.get("/images", async (c: Context) => {
    const response = await exec('docker image list', {output: OutputMode.Capture});
    if (response.status.success) {
        const lines = response.output.split('\n')
        lines.shift()

        const data = lines.map(val => val.split('  ').filter(val => val.length > 0).map(val => val.trim()))

        const rt = data.map(val =>
            new Image(val[2], val[0], val[1], val[3], val[4])
        )
        return c.json(rt);
    } else {
        return ('Something went wrong :/')
    }
})
.get("/containers", async (_) => {
    const response = await exec('docker container list -all', {output: OutputMode.Capture});
    if (response.status.success) {
        const lines = response.output.split('\n')
        lines.shift()

        const data = lines.map(val => val.split('  ').filter(val => val.length > 0).map(val => val.trim()))

        const rt = data.map(val =>
            new Container(val[0], val[1], val[2], val[3], val[4])
        )
        return rt;
    } else {
        return ('Something went wrong :/')
    }
})
.start({port: port});

console.log(`server listening on http://localhost:${port}`);
