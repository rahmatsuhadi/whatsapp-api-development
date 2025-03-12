# WhatsApp REST API

REST API wrapper for the [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) library, providing an easy-to-use interface to interact with the WhatsApp Web platform. 

## Deploy to Production

- Load the docker image in docker-compose, or your Kubernetes environment
- Disable the `ENABLE_LOCAL_CALLBACK_EXAMPLE` environment variable
- Set the `API_KEY` environment variable to protect the REST endpoints
- Run periodically the `/api/terminateInactiveSessions` endpoint to prevent useless sessions to take up space and resources(only in case you are not in control of the sessions)

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates. The official WhatsApp website can be found at https://whatsapp.com. "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners.

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=chrishubert/whatsapp-api&type=Date)](https://star-history.com/#chrishubert/whatsapp-api&Date)
