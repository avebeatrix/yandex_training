#include <iostream>
#include <fstream>
using namespace std;

int main(){
    ifstream cin("input.txt");
    ofstream cout("output.txt");
    int k;
    cin >> k;
   
	int sweet[100000000];
    int p = 0;
    int a;
    int n;
    for (int i = 1; i <= k; i++){
        cin >> a;
        cin >> n;
        for (int j = 0; j < n; j++){
        
            sweet[p] = a;
            p++;
        }
    }
   
    int left_pointer = 0;
    int right_pointer = p-1;
    
    int move_count;
    while(right_pointer-left_pointer>1){
    
        move_count = min(sweet[left_pointer], sweet[right_pointer]);
        sweet[left_pointer + 1] += move_count;
		sweet[left_pointer] -= move_count;
		sweet[right_pointer - 1] += move_count;
		sweet[right_pointer] -= move_count;
		if (sweet[left_pointer] == 0) {
			left_pointer++;
		}
		if (sweet[right_pointer] == 0) {
			right_pointer--;
		}

    }
	
	if (right_pointer - left_pointer > 0) {
		cout <<  right_pointer - left_pointer + 1 << "\n" << sweet[left_pointer] << " " << sweet[right_pointer];
	} else {
		cout <<  right_pointer - left_pointer + 1 << "\n" << sweet[left_pointer];
	}

    return 0;
}   