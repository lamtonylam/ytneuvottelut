import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export type Layoff = {
  id: number;
  companyId: number | null;
  date: string;
  firedAmount: number;
  company: {
    id: number;
    companyName: string;
    hqCity: string | null;
    companyHeadcount: number | null;
  };
};

interface TableProps {
  layoffs: Layoff[];
}

export default function LayoffsTable({ layoffs }: TableProps) {
  const sortedLayoffs = [...layoffs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Company Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Amount laid off</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedLayoffs.map((u) => (
            <TableRow key={u.id + u.date}>
              <TableCell>{u.company.companyName}</TableCell>
              <TableCell>{u.firedAmount}</TableCell>
              <TableCell>{u.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
