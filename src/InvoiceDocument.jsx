import { useState, useRef } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import Image001 from "./assets/image001.png";
import Image002 from "./assets/image002.png";
import Image003 from "./assets/image003.png";
import QrCode from "./assets/qr_code.png";
export default function InvoiceDocument({ items }) {
  const formatDate = (date) => {
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .toUpperCase();
  };

  const [invoiceData, setInvoiceData] = useState({
    text_and_date: `Monterrey, Nuevo Leon, Mexico. ${formatDate(new Date())}`,
    referenceNo: `2025-GNF${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`,
  });

  const invoiceRef = useRef();

  const [billedTo, setBilledTo] = useState({
    company: "JAMAAL ALWARD GOODS WHOLESALERS LLC",
    address: "22FLOOR 17 ROOMALMASRAF TOWERRIGGA ROAD DEIRA DUBAI UAE",
    tel: "+971525446615",
    email: "JMLWARD22@GMAIL.COM",
    representativePerson: "Muhammad Usman",
  });

  const shipTo = {
    company: "SECURED LOGISTICS SOLUTION FZCO",
    address: [
      "Dubai Airport Freezone Warehouse E21,",
      "Dubai-UAE P.O.Box 54960",
    ],
    miiCode: "MII Code: AE-1189318",
    email: "operations@secured-logistics.net",
    tel: "+971562425057",
  };

  const total = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const bankDetails = {
    bankName: "BBVA BANCOMER",
    companyName: "GRUPO NICTE FLOWER S DE RL DE CV",
    accountNo: "0074 0281 38 0119316604",
    currency: "USD (United States Dollar) Account",
    clabe: "012 060001193166040",
    swiftCode: "BCMRMXMMPYM",
    address: "59H #638 76 78 CONKAL, C.P. 97345 CONKAL, YUCATAN, MEXICO",
  };

  // const handleInvoiceDataChange = (e) => {
  //   setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  // };

  const handleBilledToChange = (e) => {
    setBilledTo({ ...billedTo, [e.target.name]: e.target.value });
  };

  const saveAsPDF = async () => {
    const input = invoiceRef.current;

    if (!input) return;

    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Invoice_${invoiceData.referenceNo}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between mt-4 mb-6">
          <div className="w-1/2 shadow p-2">
            <h3 className="font-semibold">BilledTo:</h3>
            <div className="flex gap-2 mb-1 mt-2">
              <label htmlFor="company" className="w-32">
                Company
              </label>
              <input
                type="text"
                className="w-full border px-1"
                name="company"
                value={billedTo.company}
                onChange={handleBilledToChange}
              />
            </div>

            <div className="flex gap-2 mb-1">
              <label htmlFor="address" className="w-32">
                Address
              </label>
              <input
                type="text"
                className="w-full border px-1"
                name="address"
                value={billedTo.address}
                onChange={handleBilledToChange}
              />
            </div>

            <div className="flex gap-2 mb-1">
              <label htmlFor="tel" className="w-32">
                Telephone
              </label>
              <input
                type="text"
                className="w-full border px-1"
                name="tel"
                value={billedTo.tel}
                onChange={handleBilledToChange}
              />
            </div>

            <div className="flex gap-2 mb-1">
              <label htmlFor="email" className="w-32">
                Email
              </label>
              <input
                type="text"
                className="w-full border px-1"
                name="email"
                value={billedTo.email}
                onChange={handleBilledToChange}
              />
            </div>

            <div className="flex gap-2 mb-1">
              <label htmlFor="representativePerson" className="w-32">
                Representative
              </label>
              <input
                type="text"
                className="w-full border px-1"
                name="representativePerson"
                value={billedTo.representativePerson}
                onChange={handleBilledToChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          onClick={saveAsPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save as PDF
        </button>
      </div>
      <div
        ref={invoiceRef}
        className="container mx-auto p-6 bg-white shadow-md border"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-4">
            <div>
              <img
                src={Image001}
                alt="Grupo Nicte Mexico Logo"
                width={200}
                height={200}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <img
                src={Image002}
                alt="Grupo Nicte Flower Logo"
                width={200}
                height={200}
              />
            </div>
            <div>
              <p>SOCIEDAD DE RESPONSABILIDAD LIMITADA DE CAPITAL VARIBLE</p>
              <div className="text-teal-700 text-xs mt-2">
                <p>RFC: GNF 210830M1A</p>
              </div>
              <div className="text-teal-700">
                <p className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  CDA Emiliano Zapata 11 101, Emiliano Zapata Y Interior AV. Rio
                </p>
                <p className="ml-4">
                  Consulado Peñon de los Baños. C.P. 15520. Venustiano Carranza,
                  D.F
                </p>
                <p className="flex items-center gap-1 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  59H #638 76 78 Las Américas Conkal C.P. 97345 Dzitya, Mérida,
                </p>
                <p className="ml-4">Yucatán</p>
              </div>
              <div className="text-teal-700">
                <p className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  director@gruponicte.mx
                </p>
                <p className="flex items-center gap-1 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  871 502 7155
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <img src={QrCode} alt="QR Code" width={200} height={200} />
          </div>
        </div>
        {/* Date and Reference */}
        <div className="flex justify-between mt-4 text-sm">
          <div className="w-[70%]">{invoiceData.text_and_date}</div>
          <div className="w-[30%] text-right">
            Referenceno : {invoiceData.referenceNo}
          </div>
        </div>

        {/* Subject */}
        <div className="text-center font-semibold my-6">
          <h2>
            SUBJECT: STATEMENT OF SALES AND CHARACTERISTICS OF SHIPMENT –
            INVOICE AND PACKING LIST
          </h2>
        </div>

        {/* Billing and Shipping Info */}
        <div className="flex justify-between mt-4 mb-6">
          <div className="w-1/2 pr-4">
            <h3 className="font-semibold">BilledTo:</h3>
            <p className="font-semibold">{billedTo.company}</p>
            <p className="font-semibold">{billedTo.address}</p>
            <p className="text-sm flex">Tel: {billedTo.tel}</p>
            <p className="text-sm flex">Email: {billedTo.email}</p>
            <p className="text-sm flex">
              RepresentativePerson: {billedTo.representativePerson}
            </p>
          </div>
          <div className="w-1/2 pl-4">
            <h3 className="font-semibold">Ship To:</h3>
            <p className="font-semibold">{shipTo.company}</p>
            {shipTo.address.map((line, i) => (
              <p key={i} className="text-sm">
                {line}
              </p>
            ))}
            <p className="text-sm">{shipTo.miiCode}</p>
            <p className="text-sm">Email: {shipTo.email}</p>
            <p className="text-sm">Tel: {shipTo.tel}</p>
          </div>
        </div>

        {/* Invoice Items - Using standard HTML table with Tailwind */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="w-16 py-2 px-3 text-left">No.</th>
                <th className="py-2 px-3 text-left">Description</th>
                <th className="py-2 px-3 text-left">Quantity</th>
                <th className="py-2 px-3 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-3">{item.id}</td>
                  <td className="py-2 px-3">{item.description}</td>
                  <td className="py-2 px-3">{item.quantity}</td>
                  <td className="py-2 px-3">{item.price}</td>
                </tr>
              ))}

              <tr className="bg-blue-600 text-white">
                <th colSpan={3} className="py-2 px-3 text-right">
                  Total
                </th>
                <th className="py-2 px-3 text-left">{total}</th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bank Details */}
        <div className="mt-6 bg-teal-50 p-4 border border-teal-200 rounded-md">
          <p className="text-sm font-semibold">
            The bank account details of the company are as follows:
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm">
            <p>Bank name</p>
            <p>{bankDetails.bankName}</p>
            <p>Company name</p>
            <p>{bankDetails.companyName}</p>
            <p>Account no.</p>
            <p>{bankDetails.accountNo}</p>
            <p>Currency</p>
            <p>{bankDetails.currency}</p>
            <p>CLABE</p>
            <p>{bankDetails.clabe}</p>
            <p>Swift code</p>
            <p>{bankDetails.swiftCode}</p>
            <p>Address</p>
            <p>{bankDetails.address}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p>Thank you for your order.</p>
          <p className="mt-2 font-semibold">Director, Grupo Nicte Flower</p>
          <p className="mt-2">
            Website:{" "}
            <a
              href="https://gruponicte.mx/"
              className="text-blue-600 underline"
            >
              https://gruponicte.mx/
            </a>
          </p>
          <p>c.c. Archive.</p>
        </div>

        {/* Stamp/Signature */}
        <div className="flex justify-end mt-4">
          <div className="w-32 h-32 relative">
            <img src={Image003} alt="Official Stamp" width={128} height={128} />
          </div>
        </div>
      </div>
    </>
  );
}
