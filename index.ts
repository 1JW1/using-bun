import { errorMonitor } from 'events'
import figlet from 'figlet'

const server = Bun.serve({

    port: 3000,
    fetch(req){
        const url = new URL(req.url)

        if(url.pathname === '/') {
            const body = figlet.textSync("fuck you, pay me")
            return new Response(body)
        }

        if(url.pathname === '/about') {
            return new Response('About me')
        }

        if(url.pathname === '/contact') {
            return new Response('contact us')
        }

        // error handling
        if(url.pathname === '/feed') {
            throw new Error('could not fetch feed')
        }

        return new Response('404!')

    },
    error(error) {
        return new Response(`<pre> ${error} \n ${error.stack} </pre>`, {
            headers: {
                'Content-Type': 'text/html'
            }
        })
    }
})

console.log(`Listening on PORT http://localhost:${server.port}`)