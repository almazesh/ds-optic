import WorkersList from '../../components/lists/WorkersList';
import { useGetUsersQuery } from '../../store/query/usersQuery';

const CompanyWorkers = () => {
  const { data, isLoading } = useGetUsersQuery({
    token: localStorage.getItem('accessToken'),
  })

  return (
    <WorkersList/>
  )
}

export default CompanyWorkers