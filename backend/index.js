import express from 'express';
import cors from 'cors';
import { upload } from './lib/multer.js';
import { parse } from 'csv-parse';
import fs from 'node:fs/promises';

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express.static('./public/'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    status: 200,
    data: {
      fName: 'Jose',
      lName: 'Fernandez',
    },
  });
});

app.post('/api/v1/upload', upload.single('csvFile'), async (req, res) => {
  const fileURL = new URL(req.file.path, import.meta.url);
  console.log(`File Url: ${fileURL}`);

  const csvData = await fs.open(fileURL);
  const dataStream = csvData
    .createReadStream({
      encoding: 'utf8',
    })
    .pipe(
      parse({
        // Initialize the parser
        columns: true,
        ltrim: true,
        skip_records_with_empty_values: true,
      })
    );

  const recordsToNormalize = [];
  const recordsToSkip = [];
  const records = [];

  dataStream.on('readable', () => {
    let record;
    while ((record = dataStream.read()) !== null) {
      const {
        OWNER_FIRST_NAME,
        OWNER_LAST_NAME,
        PROPERTY_ADDRESS,
        PROPERTY_CITY,
        PROPERTY_STATE,
        PROPERTY_ZIP,
        COUNTY,
        ADMIN_FIRST_NAME,
        ADMIN_LAST_NAME,
        ADMIN_MAILING_ADDRESS,
        ADMIN_MAILING_CITY,
        ADMIN_MAILING_STATE,
        ADMIN_MAILING_ZIP,
        ADMIN_PHONE,
      } = record;

      const leadsToNormalize = {};

      const leadsForSkip = {};

      records.push(record);

      // records.push(record);
    }
  });
  // Catch any error
  dataStream.on('error', function (err) {
    console.error(err.message);
  });

  dataStream.on('end', () => {
    console.log(records[0]);
    const writePath = new URL(
      req.file.destination + 'newCSV.csv',
      import.meta.url
    );

    fs.writeFile(writePath, JSON.stringify(records), 'utf8');
    res.json({ status: 200, records, file: fileURL });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
