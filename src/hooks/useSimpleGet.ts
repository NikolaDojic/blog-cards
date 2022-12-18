import { useQuery } from "react-query";

const useSimpleGet = (url: string) =>
  useQuery([url], async () => (await fetch(url)).json());

export default useSimpleGet;
