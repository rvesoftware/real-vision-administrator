import { Client } from "../types/Client";

const ClientGuide = (ref: any, {name, identification, phone, address, city}: Client) => {
    return (
        <div ref={ref}>
            <table>
                <thead>
                    <tr>
                        <th>REMITENTE</th>
                        <th>DESTINATARIO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                    <tr>{name}</tr>
                    <tr>{identification}</tr>
                    <tr>{phone}</tr>
                    <tr>{address}</tr>
                    <tr>{city}</tr>

                </tbody>
            </table>
        </div>
    )
}

export default ClientGuide;