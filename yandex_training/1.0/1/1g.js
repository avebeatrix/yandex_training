/* G. Детали */
let findNumberOfDetails = (N, K, M) => {
	let result = num_K = ost_N = num_M = ost_K = 0;

	if (K >= M) {

		while (N >= K) {
			num_K = Math.floor(N / K);
			ost_N = N % K;
			num_M = Math.floor(K / M) * num_K;
			result += num_M;
			ost_K = (K % M) * num_K;
			N = ost_N + ost_K;
		}
	}

	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const [N, K, M] = fileContent.toString().split(" ").map(input => {
	return parseInt(input);
});

fs.writeFileSync("output.txt", result.toString());