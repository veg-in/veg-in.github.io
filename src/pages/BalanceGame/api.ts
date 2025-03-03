interface BalanceGameResult {
  // id: string;
  user: string;
  resultType: string;
}
export const sendGameResult = async ({ user, resultType }: BalanceGameResult) => {
  try {
    const response = await fetch('https://backend-60km.onrender.com/api/balancegames/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, resultType }),
    });

    if (!response.ok) {
      console.error('Failed to send data:', response.status);
      return;
    }

    const data = await response.json();
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getTotalTypeCount = async (): Promise<{ totalTypeCount: number }> => {
  try {
    const response = await fetch('https://backend-60km.onrender.com/api/balancegames/results');
    if (!response.ok) {
      console.error('Failed to send data:', response.status);
      return { totalTypeCount: 0 };
    }
    const data = await response.json();
    const totalTypeCount = data.length;
    return { totalTypeCount };
  } catch (error) {
    console.error('Error:', error);
    return { totalTypeCount: 0 };
  }
};

export const getTypePercentage = async ({
  finalResult,
}: {
  finalResult: string;
}): Promise<{ typePercentage: string }> => {
  try {
    const response = await fetch(
      `https://backend-60km.onrender.com/api/balancegames/results/percentage?resultType=${finalResult}`,
    );
    if (!response.ok) {
      console.error('Failed to send data:', response.status);
      return { typePercentage: '' };
    }
    const data = await response.json();
    const typePercentage = data.percentage;
    console.log('percent', typePercentage);
    return { typePercentage };
  } catch (error) {
    return { typePercentage: '' };
  }
};
