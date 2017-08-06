function square(x){
    return x*x;
}

function sum_of_squares(x,y){
    return square(x) + square(y);
}

function f(x){
    return sum_of_squares(x+1,x*2);
}
	
function improve(guess,x){
	return average(guess,x/guess);
}

function average(x,y){
	return (x+y)/2;
}

function good_enough(guess,x){
	return Math.abs(square(guess)-x) < 0.0001;
}

function good_enough3(guess,x){
	return Math.abs(square(guess)*guess-x) < 0.0001;
}

function good_enough_per(guess,x){
	return Math.abs(square(guess)-x) < (x/1000);
}

function improve3(guess,x){
	return (x/square(guess)+2*guess)/3;
}

function sqrt3_iter(guess,x,c){
	if (good_enough3(guess,x)){
		return [guess,c];
	} else {
		return sqrt3_iter((improve3(guess,x)),x,c+1);
	}
}

function sqrt_iter(guess,x,c){
	if (good_enough(guess,x)){
		return [guess,c];
	} else {
		return sqrt_iter((improve(guess,x)),x,c+1);
	}
}

function sqrt_iter_per(guess,x,c){
	if (good_enough((improve(guess,x)),x)){
		return [guess,c];
	} else {
		return sqrt_iter_per((improve(guess,x)),x,c+1);
	}
}

function sqrt(x){
	function sqrt_iter(guess,c){
		if (good_enough(guess)){
			return [guess,c];
		} else {
			return sqrt_iter((improve(guess)),c+1);
		}
	}
	function good_enough(guess){
		return Math.abs(square(guess)-x) < 0.0001;
	}
	function improve(guess){
		return average(guess,x/guess);
	}
	return sqrt_iter(1.0, 0);
}

function akkerman (x, y){
    if (!y){
        return 0;
    }
    else if (!x){
        return 2*y;
    }
    else if (y == 1){
        return 2;
    }
    else { 
        return akkerman(x-1, akkerman(x, y-1));
    }
}

function dec(x) { return x-1; }

function inc(x) { return x+1; }

function plus_iter (a,b){
    if (!a)
        return b;
    else
        return plus_iter(dec(a),inc(b));
}

function plus_rec(a,b){
    if (!a)
        return b;
    else 
       return inc(plus_rec(dec(a), b));
}

function fibonachi_rec(x){
    if (!x || x==1)
        return 1;
    else return fibonachi_rec(x-1)+fibonachi_rec(x-2);
}

function fibonachi_iter(x){
    function fib_aux(x,y,count){
        if (!count)
            return x;
        else 
            return fib_aux(x+y,x,count-1);
    }
    
    return fib_aux(1,0,x);
}

function list_f(from,to,f){
    var f_list = [];
    for (var i=from; i<to; i++)
        f_list.push(f(i));
    return f_list;
}

function list_f2(from,to,y,f){
    var f_list = [];
    for (var i=from; i<to; i++)
        f_list.push(f(y,i));
    return f_list;
}

function both_f_results(x,f1,f2){
    var f1_list = list_f(1,x,f1);
    var f2_list = list_f(1,x,f2);
    return [f1_list,f2_list];
}

function both_f_results2(x,y,f1,f2){
    var f1_list = list_f2(1,x,y,f1);
    var f2_list = list_f2(1,x,y,f2);
    return [f1_list,f2_list];
}

function fibonachi_both(x){
    return both_f_results(x,fibonachi_rec,fibonachi_iter);
}

function exchange(amount){
    function nominal(count){
        switch(count){
            case 1: return 1;
            case 2: return 5;
            case 3: return 10;
            case 4: return 25;
            case 5: return 50;
        }
    }
    function aux(amount,count){
        if (!amount)
            return 1;
        else if (amount<0 || !count) 
            return 0;
        else 
            return aux(amount,count-1)+aux(amount-nominal(count),count);
    }
    return aux(amount,5);
}

function zad111_rec(n){
    if (n<3)
        return n;
    else 
        return zad111_rec(n-1)+zad111_rec(n-2)+zad111_rec(n-3);
}

function zad111_iter(n){
    function aux(n1,n2,n3,count){
        if (count<3)
            return count;
        else if (count == 3)
            return n1;
        else 
            return aux(n1+n2+n3,n1,n2,count-1);
    }
    return aux(3,2,1,n);
}

function zad111_list(n){
    return both_f_results(n,zad111_iter,zad111_rec);
}

function pascal_triangle(n,x){  // n - строчка, x - номер числа
    if (x==1 || x==n)
        return 1;
    else 
        return pascal_triangle(n-1,x-1)+pascal_triangle(n-1,x);
}

function pascal_triangle_list(n){
    var list = [];
    for (var i = 1; i<=n; i++)
        list.push(pascal_triangle(n,i));
    return list;
}

function fib_dok(n){
    var fi = (1+Math.sqrt(5))/2;
    var psi = (1-Math.sqrt(5))/2;
    
    var pfibn = Math.pow(fi,n)/Math.sqrt(5);
    var fibn = (Math.pow(fi,n)-Math.pow(psi,n))/Math.sqrt(5);
    
    return fibn;
}

function time_f(lst){
    name = lst[2]
    console.time(name)
    result = lst[3](lst[0],lst[1])
    console.timeEnd(name)
    return result
}

function expt_rec(x,n){
    function aux(x,n){
        if (n==1)
            return x
        else
            return x*aux(x,n-1)
    }
    name = 'Рекурсивное вычисление степени по определению для '+x+' в '+n;
    return time_f([x,n,name,aux]);
}

function expt_iter(x,n){
    function aux_iter(x,n,res){
        if (!n)
            return res;
        else 
            return aux_iter(x,n-1,res*x);
    }
    function aux(x,n){
        return aux_iter(x,n,1);
    }
    name = 'Итеративное вычисление степени по определению для '+x+' в '+n;
    return time_f([x,n,name,aux]);
}

function fast_expt_rec(x,n){
    function aux(x,n){
        if (!n)
            return 1
        else if (!(n/2))
            return x*x*aux(x,n/2)
        else     
            return x*aux(x,n-1)
    }
    name = 'Быстрое рекурсивное вычисление степени через квадрат для '+x+' в '+n;
    return time_f([x,n,name,aux]);
}

function fast_expt_iter_log(x,n){
    // заботиться об инварианте: res*x^n
    function aux_iter(x0,x,n,res,c){
        if (!n){
            console.log("Финальный шаг:      ",x0,x,n,res,c)
            console.log("Инварианта:   "+Math.pow(x,n)*res)
            return [res,c]
        }
        else if (!(n%2)){
            console.log("Четный переход:     ",x0,x,n,res,c)
            console.log("Инварианта:   "+Math.pow(x,n)*res)
            return aux_iter(x0,x*x,n/2,res,c+1)
        }
        else {    
            console.log("Нечетный переход:   ",x0,x,n,res,c)
            console.log("Инварианта:   "+Math.pow(x,n)*res)
            return aux_iter(x0,x,n-1,res*x,c+1)
        }
    }
    function aux(x,n){
        return aux_iter(x,x,n,1,1)
    }
    name = 'Быстрое итеративное вычисление степени через квадрат для '+x+' в '+n;
    return time_f([x,n,name,aux]);
}

function fast_expt_iter(x,n){
    // заботиться об инварианте: res*x^n
    function aux_iter(x,n,res){
        if (!n)
            return res
        else if (!(n%2))
            return aux_iter(x*x,n/2,res)
        else 
            return aux_iter(x,n-1,res*x)
    }
    function aux(x,n){
        return aux_iter(x,n,1)
    }
    name = 'Быстрое итеративное вычисление степени через квадрат для '+x+' в '+n;
    return time_f([x,n,name,aux]);
}

// умножение через процедуры половины и удвоения
function mul_by_rus_peasant(a,b){
    halve = function(x){return x/2}
    doubl = function(x){return x*2}
    
    function aux_iter(a,b,res){
        if (!a || !b)
            return 0
        else if (b==1)
            return res+a
        else if (!(b%2))
            return aux_iter(doubl(a),halve(b),res)
        else
            return aux_iter(a,b-1,res+a)
    }
    
    return aux_iter(a,b,0);
}

// вычисление НОД (Greatest common divisor)
function gcd(a,b){
    if (!b)
        return a
    else
        return gcd(b,a%b)
}

function fib_concept(a,b,p,q){
    na = b*q + a*q + a*p
    nb = b*p + a*q
    return []
}

function fib_iter(n){
    function aux(a,b,p,q,count){
        if (!count)
            return b
        else if (!(count%2)){
            return aux(a,       //FIXME
                b,
                p,    
                q,    
                count/2)
        }
        else 
            return aux(b*q+a*q+a*p,
                b*p+a*q,
                p,
                q,
                count-1)
    }
    return aux(1,0,0,1,n)
}