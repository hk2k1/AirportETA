// components/Dashboard/KeyContactNumbers.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const contactData = {
    taxiCompanies: [
        { name: "Comfort Del Gro", number: "6552 1122" },
        { name: "SMRT", number: "6555 8888" },
        { name: "Transcab", number: "6555 1111" },
        { name: "Premier", number: "6476 3033 (2)" },
        { name: "Prime", number: "6778 0808" },
        { name: "HDT", number: "6258 8888" }
    ],
    lostAndFound: [
        { name: "Comfort Del Gro", number: "6552 4525" }
    ],
    systemVendors: [
        { name: "O'Connor's (T1-T3)", number: "9772 7269" },
        { name: "O'Connor's (T4)", number: "9710 4876" },
        { name: "Sun Singapore (Hotline)", number: "6555 6178" },
        { name: "Sun Singapore (Tek)", number: "9683 7608" }
    ]
};

export function Contact() {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Key Contact Numbers</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Taxi Companies</h3>
                        <Table>
                            <TableBody>
                                {contactData.taxiCompanies.map((company, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{company.name}</TableCell>
                                        <TableCell>{company.number}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Taxi Company Lost & Found</h3>
                        <Table>
                            <TableBody>
                                {contactData.lostAndFound.map((company, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{company.name}</TableCell>
                                        <TableCell>{company.number}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">System Vendors</h3>
                        <Table>
                            <TableBody>
                                {contactData.systemVendors.map((vendor, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{vendor.name}</TableCell>
                                        <TableCell>{vendor.number}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}