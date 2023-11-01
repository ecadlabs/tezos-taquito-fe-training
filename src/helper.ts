export const connectionStatus = (userAddress: string, userBalance: number): boolean | undefined => {

  if (userAddress && !isNaN(userBalance)) {
    return true;
  } else if (!userAddress && !userBalance){
    return false;
  }

}