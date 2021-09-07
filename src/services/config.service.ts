import { TcpClientOptions, Transport } from "@nestjs/microservices";

export class ConfigService {
  public getUserSvcOptions(): TcpClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        port: 8102,
        host: "localhost"
      }
    };
  }

  public getAuthSvcOptions(): TcpClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        port: 8101,
        host: "localhost"
      }
    };
  }
}